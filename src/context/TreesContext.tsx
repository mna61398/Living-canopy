import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { AdoptedTree, getTreeType, MOCK_ADOPTED_TREES, TreeTypeId } from '../data/trees';

type TreesContextValue = {
  trees: AdoptedTree[];
  adoptTree: (typeId: TreeTypeId, customName: string) => AdoptedTree;
  renameTree: (id: string, customName: string) => void;
};

const TreesContext = createContext<TreesContextValue | null>(null);

export function TreesProvider({ children }: { children: ReactNode }) {
  const [trees, setTrees] = useState<AdoptedTree[]>(MOCK_ADOPTED_TREES);

  const adoptTree = useCallback((typeId: TreeTypeId, customName: string) => {
    const type = getTreeType(typeId)!;
    // Mock: assign an existing mature tree near the community, with a small random offset.
    const tree: AdoptedTree = {
      id: `lc-${Date.now()}`,
      typeId,
      customName: customName.trim() || `My ${type.name}`,
      ageYears: Math.round(type.lifespanYears * (0.15 + Math.random() * 0.25)),
      heightM: Math.round(type.maxHeightM * (0.6 + Math.random() * 0.3) * 10) / 10,
      carbonKg: Math.round(type.maxCarbonKg * (0.4 + Math.random() * 0.4)),
      coordinate: {
        latitude: type.coordinate.latitude + (Math.random() - 0.5) * 0.004,
        longitude: type.coordinate.longitude + (Math.random() - 0.5) * 0.004,
      },
      adoptedOn: new Date().toISOString().slice(0, 10),
    };
    setTrees((prev) => [tree, ...prev]);
    return tree;
  }, []);

  const renameTree = useCallback((id: string, customName: string) => {
    const name = customName.trim();
    if (!name) return;
    setTrees((prev) => prev.map((t) => (t.id === id ? { ...t, customName: name } : t)));
  }, []);

  const value = useMemo(() => ({ trees, adoptTree, renameTree }), [trees, adoptTree, renameTree]);

  return <TreesContext.Provider value={value}>{children}</TreesContext.Provider>;
}

export function useTrees() {
  const ctx = useContext(TreesContext);
  if (!ctx) throw new Error('useTrees must be used inside TreesProvider');
  return ctx;
}
