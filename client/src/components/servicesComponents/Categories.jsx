function Categories() {
  return (
    <article className="flex flex-col items-center border-2 border-slate-200 rounded-xl py-4 px-2">
      <h1 className="text-xl font-bold">Categorias</h1>
      <ul className="flex flex-col gap-4 [&>li]:font-semibold items-start p-2 w-full">
        <li>Barberia</li>
        <li>SPA de uñas</li>
        <li>Peluqueria</li>
      </ul>
    </article>
  );
}

export default Categories;
