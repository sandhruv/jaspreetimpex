import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1 style={{ fontSize: "72px", fontWeight: "700", color: "var(--primary)" }}>404</h1>
      <h2 style={{ marginBottom: "16px" }}>Page Not Found</h2>
      <p style={{ marginBottom: "32px", color: "var(--text-light)" }}>
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
