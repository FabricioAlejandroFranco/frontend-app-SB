export default function Button({ children, onSelect }) {
  return (
    <button style={{ marginLeft: 2, marginRight: 2 }} onClick={onSelect}>
      {children}
    </button>
  );
}
