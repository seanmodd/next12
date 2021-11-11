import styled from 'styled-components';

export const LoginNotificationWrapper = styled.div`
  display: ${(props) => (props.loggedIn ? 'none' : 'block')};
`;
