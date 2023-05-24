export default async function Navbar() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result: any[] = await new Promise(async (resolve: any) => {
    const a = await data.json();
    setTimeout(() => {
      resolve(a);
    }, 2000);
  });

  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
      {result.map((item: any) => {
        return (
          <ul key={item.id}>
            <li>
              <a href={`/post/${item.id}`}>{item.title}</a>
            </li>
          </ul>
        );
      })}
    </nav>
  );
}
