export default function App() {
  return (
    <div className="container">
      <section
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1>What&#39;s on your mind?</h1><br/>
        <input
          placeholder="Search for Something"
          style={{
            padding: "5px 20px",
            width: "500px",
            height: "50px",
            fontSize: "17px",
          }}
        />
      </section>
    </div>
  );
}
