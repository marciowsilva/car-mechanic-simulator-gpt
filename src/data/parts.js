const PARTS = [
  {
    id: "wheel",
    name: "Roda",
    price: 150,
    tool: "wheel_tool",
  },
  {
    id: "brake_pad",
    name: "Pastilha de Freio",
    price: 80,
    tool: "wheel_tool",
    dependencies: ["wheel"], // 👈 precisa remover roda antes
  },
  {
    id: "battery",
    name: "Bateria",
    price: 100,
    tool: "wrench",
  },
  {
    id: "spark_plug",
    name: "Vela",
    price: 40,
    tool: "socket",
  },
];

export default PARTS;
