export default function ErrorMessage({ message }) {
    return <div style={{ color: 'red', padding: '20px', border: '1px solid red', borderRadius: '5px' }}>
        ❌ {message}
    </div>;
}