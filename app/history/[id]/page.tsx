export default async function HistoryDetailPage({ params }: any) {
  const { id } = await params;
  return (
    <div>
      <h1>History Detail Page</h1>
      <p>Interview ID: {id}</p>
    </div>
  );
}
