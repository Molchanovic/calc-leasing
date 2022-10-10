export async function postDataToServer(data) {
  try {
    await fetch("https://hookb.in/eK160jgYJ6UlaRPldJ1P", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (er) {
    console.log(er.message);
  }
  return false;
}
