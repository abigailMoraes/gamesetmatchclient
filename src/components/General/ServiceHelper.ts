export default function handleErrors(response:any) {
  if (!response.ok) {
    console.log(`response:${response}`);
    return response.json().then((text:any) => {
      console.log(text);
      if (text.message) {
        // TODO type this error
        throw new Error(text.message);
      }
      // TODO type this error
      throw new Error(text.error);
    });
  }
  return response;
}
