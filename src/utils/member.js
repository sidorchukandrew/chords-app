export function getNameOrEmail(member) {
  if (member.first_name || member.last_name) {
    return [member.first_name, member.last_name].join(' ').trim();
  } else if (member.email) {
    return member.email;
  } else {
    return '';
  }
}

export function getAvatarInitials(member) {
  let titleParts = getNameOrEmail(member).split(' ');
  let initials = titleParts.map(part => part.charAt(0).toUpperCase()).join('');

  return initials;
}

export function hasName(member) {
  return !!member.first_name || !!member.last_name;
}
