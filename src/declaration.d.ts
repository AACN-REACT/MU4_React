declare module "*.scss" {
  export default "" as string;
}

declare module '*.svg' {
  const value: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}
