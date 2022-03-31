export default function handleErrors(response:any) {
  if (!response.ok) {
    return response.json().then((text:any) => {
      if (text.message) {
        throw new Error(text.message);
      }
      throw new Error(text.error);
    });
  }
  return response;
}
