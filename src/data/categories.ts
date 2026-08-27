export type Category = {
  id: string;
  label: string;
  description: string;
};

export const categories: Category[] = [
  { id: "flagship", label: "Xiaomi", description: "A linha principal de smartphones Xiaomi." },
  { id: "poco", label: "POCO", description: "Performance e velocidade." },
  { id: "redmi", label: "Redmi", description: "Custo-benefício sem abrir mão de qualidade." },
  { id: "tablets", label: "Xiaomi Pad", description: "Tablets para trabalho, estudo e criação." },
  { id: "wearables", label: "Xiaomi Watch", description: "Saúde e conectividade no pulso." },
];
