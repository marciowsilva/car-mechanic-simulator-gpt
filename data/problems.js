export const problemsDatabase = [
  {
    id: "dead_battery",
    name: "Bateria descarregada",
    affectedPart: "battery",
    minCondition: 0.3,
    reward: 120,
  },
  {
    id: "worn_spark_plug",
    name: "Vela desgastada",
    affectedPart: "spark_plug",
    minCondition: 0.4,
    reward: 90,
  },
  {
    id: "dirty_air_filter",
    name: "Filtro de ar sujo",
    affectedPart: "air_filter",
    minCondition: 0.5,
    reward: 70,
  },
  {
    id: "bad_brake_pad",
    name: "Pastilha de freio gasta",
    affectedPart: "brake_pad",
    minCondition: 0.4,
    reward: 150,
  },
  {
    id: "oil_filter_clogged",
    name: "Filtro de óleo entupido",
    affectedPart: "oil_filter",
    minCondition: 0.5,
    reward: 110,
  },
];
