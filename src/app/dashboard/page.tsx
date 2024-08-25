// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    <>
      <h1>Hello, Dashboard Page!</h1>
      <table>
        <tbody>
          <tr>
            <form>
              <input placeholder="hello" type="text" />
            </form>
          </tr>
        </tbody>
      </table>
    </>
  );
}
