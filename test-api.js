async function test() {
  const form = new FormData();
  form.append('file', new Blob([Buffer.from('hello world')]), 'test.pdf');
  try {
    const res = await fetch('http://localhost:3000/api/resume-studio/parse', {
      method: 'POST',
      body: form
    });
    const data = await res.json();
    console.log(res.status, data);
  } catch (e) {
    console.error(e);
  }
}
test();
