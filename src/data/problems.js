const PROBLEMS = [
  {
    id: "dead_battery",
    name: "Bateria descarregada",
    partId: "battery",
    minCondition: 0.3,
    reward: 120,
    methods: ["inspection"],
    symptoms: ["no_start"],
  },
  {
    id: "worn_spark_plug",
    name: "Vela desgastada",
    partId: "spark_plug",
    minCondition: 0.4,
    reward: 90,
    methods: ["inspection", "scanner"],
    symptoms: ["engine_misfire"],
  },
  {
    id: "dirty_air_filter",
    name: "Filtro de ar sujo",
    partId: "air_filter",
    minCondition: 0.5,
    reward: 70,
    methods: ["inspection"],
    symptoms: ["low_power"],
  },
  {
    id: "bad_brake_pad",
    name: "Freio gasto",
    partId: "brake_pad",
    minCondition: 0.4,
    reward: 150,
    methods: ["inspection"],
    symptoms: ["brake_noise"],
  },
];

export default PROBLEMS;
