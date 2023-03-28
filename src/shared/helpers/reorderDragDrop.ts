const reorderDragDrop = <T extends unknown>(
  list: T[],
  startIndex: number,
  endIndex: number,
  needPosition: boolean = true
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => {
    return {
      ...item,
      position: needPosition
        ? index !== result.length - 1
          ? index
          : item.position
        : index,
    };
  });
};

export default reorderDragDrop;
