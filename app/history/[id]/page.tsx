export default async function HistoryDetailPage({ params }: any) {
  const { id } = await params;
  console.log("HistoryDetailPage params:", params);
  return (
    <div>
      <h1>History Detail Page</h1>
      <p>Interview ID: {id}</p>
    </div>
  );
}
