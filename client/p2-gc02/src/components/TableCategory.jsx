function TableCategory({item}) {
  return (
    <>
      <tr key={item.id} className="border-t hover:bg-gray-100 transition-colors duration-200">
        <td className="py-3 px-4 text-gray-700">{item.name}</td>
      </tr>
    </>
  );
}

export default TableCategory