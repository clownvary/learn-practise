export function getAuthorityType(authState, authorityId) {
  const { authorities } = authState.toJS();
  const authorityTypes = authorities.filter((authority) => authority.id === authorityId);
  let authorityType = null;

  if (authorityTypes && authorityTypes.length) {
    authorityType = authorityTypes[0].authorityType;
  }
  return authorityType;
}
