interface ParamsDefinition {
  [key: string]: string;
}

export default function getParam(searchParam: string): string | undefined {
  const [, search] = window.location.search.split('?');
  if (search) {
    const params = search.split('&').reduce((accumulator, param) => {
      const [key, value] = param.split('=');
      if (!value) {
        return accumulator;
      }
      return { ...accumulator, [key]: value };
    }, {}) as ParamsDefinition;
    return params[searchParam];
  }

  return undefined;
}
