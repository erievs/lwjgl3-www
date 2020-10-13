import { NavLink } from 'react-router-dom';
import { styled } from '~/theme/stitches.config';

interface Props {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  variant: string;
}

const MainMenuContainer = styled('nav', {
  variants: {
    horizontal: {
      true: {
        flex: '1 0 auto',
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '0 1.5rem',
      },
    },
    vertical: {
      true: {
        display: 'flex',
        flexFlow: 'column nowrap',
        gap: '1rem 0',
        fontSize: '1.25rem',
        textAlign: 'right',
        a: {
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 300,
          ':focus': {
            outline: 'none',
            textDecoration: 'underline',
          },
          ':hover,&.active': {
            color: 'yellow',
          },
        },
      },
    },
  },
});

export const MainMenu: React.FC<Props> = ({ onClick, variant, className }) => (
  <MainMenuContainer role="navigation" aria-label="Main Menu" {...{ [variant]: true }} className={className}>
    <NavLink onClick={onClick} to="/" end>
      HOME
    </NavLink>
    <NavLink onClick={onClick} to="/guide">
      GET STARTED
    </NavLink>
    <NavLink onClick={onClick} to="/download">
      DOWNLOAD
    </NavLink>
    <NavLink onClick={onClick} to="/customize">
      CUSTOMIZE
    </NavLink>
    <NavLink onClick={onClick} to="/source">
      SOURCE
    </NavLink>
    <NavLink onClick={onClick} to="/frameworks">
      FRAMEWORKS
    </NavLink>
  </MainMenuContainer>
);
