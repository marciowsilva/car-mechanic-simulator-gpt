const PROBLEMS = [
  {
    id: "dead_battery",
    name: "Bateria descarregada",
    partId: "battery",
    minCondition: 0.3,
    reward: 120,
  },
  {
    id: "worn_spark_plug",
    name: "Vela desgastada",
    partId: "spark_plug",
    minCondition: 0.4,
    reward: 90,
  },
  {
    id: "dirty_air_filter",
    name: "Filtro de ar sujo",
    partId: "air_filter",
    minCondition: 0.5,
    reward: 70,
  },
  {
    id: "bad_brake_pad",
    name: "Pastilha de freio gasta",
    partId: "brake_pad",
    minCondition: 0.4,
    reward: 150,
  },
  {
    id: "clogged_oil_filter",
    name: "Filtro de óleo entupido",
    partId: "oil_filter",
    minCondition: 0.5,
    reward: 110,
  },
];

export default PROBLEMS;
