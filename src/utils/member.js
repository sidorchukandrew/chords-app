export function getNameOrEmail(member) {
  if (member.first_name || member.last_name)
    return [member.first_name, member.last_name].join(' ').trim();
  else {
    return member.email;
  }
}

export function getAvatarInitials(member) {
  let titleParts = getNameOrEmail(member).split(' ');
  initials = titleParts.map(part => part.charAt(0).toUpperCase()).join('');

  return initials;
}

export function hasName(member) {
  return !!member.first_name || !!member.last_name;
}
