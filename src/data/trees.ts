export type TreeTypeId = 'cacao' | 'cupuacu' | 'brazil-nut' | 'acai' | 'buriti' | 'andiroba';

export type TreeType = {
  id: TreeTypeId;
  name: string;
  emoji: string;
  pricePerMonth: number;
  community: string;
  region: string;
  description: string;
  products: string[];
  // Typical mature size, used to scale progress bars.
  maxHeightM: number;
  maxCarbonKg: number;
  lifespanYears: number;
  coordinate: { latitude: number; longitude: number };
};

export const TREE_TYPES: TreeType[] = [
  {
    id: 'cacao',
    name: 'Cacao Tree',
    emoji: '🍫',
    pricePerMonth: 35,
    community: 'Comunidade São Raimundo',
    region: 'Médio Juruá, Amazonas',
    description: 'The tree behind chocolate. Pods are hand-harvested and fermented by the community.',
    products: ['Chocolate bars', 'Cocoa butter skincare', 'Cacao nibs', 'Cacao powder', 'Cacao husk tea'],
    maxHeightM: 8,
    maxCarbonKg: 600,
    lifespanYears: 100,
    coordinate: { latitude: -5.6232, longitude: -67.8551 },
  },
  {
    id: 'cupuacu',
    name: 'Cupuaçu Tree',
    emoji: '🥥',
    pricePerMonth: 35,
    community: 'Comunidade Nova Esperança',
    region: 'Rio Negro, Amazonas',
    description: 'A close cousin of cacao with a creamy, tropical fruit and a rich, nourishing butter.',
    products: ['Cupuaçu body butter', 'Lip balm', 'Hair mask', 'Cupuaçu chocolate', 'Fruit jam'],
    maxHeightM: 18,
    maxCarbonKg: 1500,
    lifespanYears: 80,
    coordinate: { latitude: -2.9937, longitude: -60.6875 },
  },
  {
    id: 'brazil-nut',
    name: 'Brazil Nut Tree',
    emoji: '🌰',
    pricePerMonth: 30,
    community: 'Cooperativa Castanheiros do Iratapuru',
    region: 'Rio Iratapuru, Amapá',
    description: 'A rainforest giant that only fruits in healthy, intact forest. It cannot be farmed.',
    products: ['Raw Brazil nuts', 'Nut butter', 'Brazil nut hair & skin oil', 'Granola'],
    maxHeightM: 50,
    maxCarbonKg: 20000,
    lifespanYears: 500,
    coordinate: { latitude: -0.5743, longitude: -52.5768 },
  },
  {
    id: 'acai',
    name: 'Açaí Palm',
    emoji: '🫐',
    pricePerMonth: 30,
    community: 'Comunidade Ribeirinha do Marajó',
    region: 'Ilha do Marajó, Pará',
    description: 'Clusters of deep-purple berries climbed for and harvested by hand along the rivers.',
    products: ['Freeze-dried açaí powder', 'Açaí energy bars', 'Açaí seed coffee'],
    maxHeightM: 25,
    maxCarbonKg: 400,
    lifespanYears: 50,
    coordinate: { latitude: -1.0012, longitude: -49.5384 },
  },
  {
    id: 'buriti',
    name: 'Buriti Palm',
    emoji: '🌴',
    pricePerMonth: 32,
    community: 'Associação Mulheres do Buriti',
    region: 'Baixo Tocantins, Pará',
    description: 'The “tree of life” of wetland communities, rich in beta-carotene.',
    products: ['Buriti skincare oil', 'After-sun oil', 'Buriti fruit sweets'],
    maxHeightM: 35,
    maxCarbonKg: 900,
    lifespanYears: 100,
    coordinate: { latitude: -2.2405, longitude: -49.4972 },
  },
  {
    id: 'andiroba',
    name: 'Andiroba Tree',
    emoji: '🌿',
    pricePerMonth: 28,
    community: 'Comunidade Indígena Tapajó',
    region: 'Rio Tapajós, Pará',
    description: 'Its seed oil has been used for generations to heal skin and keep insects away.',
    products: ['Natural insect repellent', 'Healing balm', 'Handmade soap'],
    maxHeightM: 30,
    maxCarbonKg: 6000,
    lifespanYears: 200,
    coordinate: { latitude: -2.8547, longitude: -55.0368 },
  },
];

export function getTreeType(id: string): TreeType | undefined {
  return TREE_TYPES.find((t) => t.id === id);
}

export type AdoptedTree = {
  id: string;
  typeId: TreeTypeId;
  customName: string;
  ageYears: number;
  heightM: number;
  carbonKg: number;
  coordinate: { latitude: number; longitude: number };
  adoptedOn: string;
};

export const MOCK_ADOPTED_TREES: AdoptedTree[] = [
  {
    id: 'lc-0001',
    typeId: 'brazil-nut',
    customName: 'Grandma Rosa',
    ageYears: 142,
    heightM: 41,
    carbonKg: 14200,
    coordinate: { latitude: -0.5761, longitude: -52.5749 },
    adoptedOn: '2026-03-14',
  },
  {
    id: 'lc-0002',
    typeId: 'cacao',
    customName: 'Little Cocoa',
    ageYears: 18,
    heightM: 6.2,
    carbonKg: 310,
    coordinate: { latitude: -5.6218, longitude: -67.8567 },
    adoptedOn: '2026-07-02',
  },
];

export type SensorAlert = {
  id: string;
  icon: 'shield-checkmark' | 'volume-mute' | 'thermometer' | 'water' | 'leaf' | 'satellite';
  title: string;
  time: string;
};

export function getSensorAlerts(tree: AdoptedTree): SensorAlert[] {
  return [
    { id: '1', icon: 'volume-mute', title: 'No chainsaw activity detected in the last 24h', time: '5 min ago' },
    { id: '2', icon: 'satellite', title: 'Satellite pass confirmed canopy intact', time: '2h ago' },
    { id: '3', icon: 'shield-checkmark', title: `Ranger patrol checked on ${tree.customName}`, time: 'Yesterday' },
    { id: '4', icon: 'water', title: 'Soil moisture healthy (68%)', time: 'Yesterday' },
    { id: '5', icon: 'thermometer', title: 'No fire hotspots within 10 km', time: '2 days ago' },
    { id: '6', icon: 'leaf', title: 'Harvest logged by the community for this month’s box', time: '4 days ago' },
  ];
}

// Example split of a $35 subscription.
export const MONEY_SPLIT = [
  { label: 'Local community', amount: 15, color: '#2E9E62' },
  { label: 'Packaging & shipping', amount: 10, color: '#7BC67B' },
  { label: 'Technology & monitoring', amount: 5, color: '#E9A23B' },
  { label: 'Living Canopy', amount: 5, color: '#0F3D2E' },
];
