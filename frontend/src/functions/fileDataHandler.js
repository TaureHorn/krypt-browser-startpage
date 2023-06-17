export function fileDataExtractor(data) {
  const fileDataReader = new FileReader();
  fileDataReader.readAsText(data, "UTF-8");
  if (data.type === "application/json") {
    return new Promise((resolve) => {
      fileDataReader.onload = (e) => {
        const jsonParser = JSON.parse(e.target.result);
        resolve(JSON.stringify(jsonParser));
      };
    });
  } else if (data.type === "text/plain" || data.type === "") {
    return new Promise((resolve) => {
      fileDataReader.onload = (e) => {
        resolve(e.target.result);
      };
    });
  }
}
