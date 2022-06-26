const postDataJSON = async (url, data) => {

  const pro = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  if (!pro.ok) {
    const err = new Error(`Could not fetch ${url}, status: ${pro.status}`);
    console.error(err);
    throw err;
  }
  console.log(pro.ok);
  return await pro.json();
};

const postDataFormData = async (url, data) => {

  const pro = await fetch(url, {
    method: 'POST',
    body: data
  });

  if (!pro.ok) {
    const err = new Error(`Could not fetch ${url}, status: ${pro.status}`);
    console.error(err);
    throw err;
  }

  return await pro.text();
};

export default postDataJSON;
export { postDataFormData };