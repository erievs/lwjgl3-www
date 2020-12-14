import { ImgLazy } from '~/components/ui/ImgLazy';
import { Container } from '~/components/layout/Container';
import { Grid } from '~/components/layout/Grid';
import { TitleSection } from '~/components/lwjgl/TitleSection';
import { Dark } from '~/components/lwjgl/Dark';

export const GoldSponsors: React.FC<{ children?: never }> = () => (
  <Dark>
    <Container as="section" padding>
      <TitleSection>Our Gold Sponsors:</TitleSection>
      <Grid
        css={{
          gap: '$safe',
          alignItems: 'center',
          width: '100%',
          pt: '$gap',
          sm: {
            textAlign: 'center',
            grid: 'auto-flow / repeat(2, 1fr)',
          },
          md: {
            grid: 'auto-flow / repeat(3, 1fr)',
          },
          lg: {
            grid: 'auto-flow / repeat(4, 1fr)',
          },
        }}
      >
        <a
          href="https://www.casinotop.com/?utm_source=opencollective&utm_medium=affiliate&utm_campaign=lwjgl"
          title="Online Casino Guide in Canada - Best Gaming Experience!"
          rel="sponsored"
          target="_blank"
        >
          <ImgLazy width={130 * 1.5} height={20 * 1.5} src="/img/sponsors/casinotop-129x20.svg" alt="CASINOTOP" />
        </a>
        <a
          href="https://www.parhaatnettikasinot.com/"
          rel="sponsored"
          target="_blank"
          title="Kaikki luotettavat ja parhaat nettikasinot"
        >
          <ImgLazy
            width={330.8 * 0.75}
            height={46.4 * 0.75}
            src="/img/sponsors/parhaat-nettikasinot.svg"
            alt="parhaat nettikasinot"
          />
        </a>
        <a
          href="https://nettikasinot247.fi/?utm_source=opencollective&utm_medium=affiliate&utm_campaign=lwjgl"
          title="KÄRKITASON NETTIKASINOT"
          rel="sponsored"
          target="_blank"
        >
          <ImgLazy
            width={467 * 0.5}
            height={112 * 0.5}
            src="/img/sponsors/nettikasinot-logo-467x112.png"
            alt="NETTIKASINOT247"
            css={{ filter: 'invert(90%)' }}
          />
        </a>
        <a
          href="https://nettikasinolista.com/"
          rel="sponsored"
          target="_blank"
          title="Se paras nettikasino-lista: arvostelut, bonukset ja kokemuksia"
        >
          <ImgLazy width={225} height={60} src="/img/sponsors/nettikasinolista.svg" alt="Nettikasino-lista" />
        </a>
        <a
          href="https://www.turtlebet.com/fi/kaikki-nettikasinot.html"
          rel="sponsored"
          target="_blank"
          title="Kaikki nettikasinot - Katso Turtlebetin kaikki kasinot lista!"
        >
          <ImgLazy
            width={173}
            height={40}
            src="/img/sponsors/turtlebet-173x40.svg"
            alt="Turtlebet"
            css={{ filter: 'invert(100%) hue-rotate(180deg)' }}
          />
        </a>
        <a
          href="https://www.vpsserver.com/?utm_source=opencollective&utm_medium=affiliate&utm_campaign=lwjgl"
          rel="sponsored"
          target="_blank"
          title="VPS HOSTING - GET YOUR FREE VPS TRIAL NOW!"
        >
          <ImgLazy width={218} height={50} src="/img/sponsors/vpsserver.com.svg" alt="VPSSERVER.com" />
        </a>
        <a href="https://buy.fineproxy.org/eng/" rel="sponsored" target="_blank" title="BUY PROXY FROM FINEPROXY">
          <ImgLazy
            width={250 / 1.25}
            height={70 / 1.25}
            src="/img/sponsors/fineproxy-logo-250x70.png"
            alt="Fineproxy"
            css={{ filter: 'invert(90%)' }}
          />
        </a>
        <a
          href="https://www.bonus.net.nz/free-spins-no-deposit?utm_source=opencollective&utm_medium=affiliate&utm_campaign=lwjgl"
          rel="sponsored"
          target="_blank"
          title="Free Spins No Deposit"
        >
          <ImgLazy width={179.71} height={38} src="/img/sponsors/bonusfindernz.svg" alt="BonusFinder New Zealand" />
        </a>
        <a
          href="https://www.kasinot.fi/"
          rel="sponsored"
          target="_blank"
          title="Kasinot netissä: #1 opas nettikasinoiden maailmaan"
        >
          <ImgLazy width={384 / 3} height={128 / 3} src="/img/sponsors/kasinot-384x128.png" alt="Kasinot.fi" />
        </a>
        <a href="http://nettikasinot.org/" rel="sponsored" target="_blank" title="Universumin parhaat nettikasinot">
          <ImgLazy width={585 / 3} height={116 / 3} src="/img/sponsors/nettikasinot-585x116.png" alt="Nettikasinot" />
        </a>
        <a
          href="https://www.pelisivut.com/"
          rel="sponsored"
          target="_blank"
          title="Rahapelit netissä laadukkaasti ja luotettavasti"
        >
          <ImgLazy width={620 / 3} height={152 / 3} src="/img/sponsors/pelisivut-620x152.png" alt="PELISIVUT" />
        </a>
        <a
          href="https://www.casinotopp.net/?utm_source=opencollective&utm_medium=github&utm_campaign=lwjgl"
          rel="sponsored"
          target="_blank"
          title="Velkommen til CasinoTopp – Norges beste portal til online casino"
        >
          <ImgLazy width={144 * 1.25} height={20 * 1.25} src="/img/sponsors/casinotopp-143x20.svg" alt="CASINOTOPP" />
        </a>
        <a
          href="https://www.bonusfinder.com/?utm_source=opencollective&utm_medium=affiliate&utm_campaign=lwjgl"
          rel="sponsored"
          target="_blank"
          title="Online Gambling at Bonusfinder USA"
        >
          <ImgLazy width={179.71} height={38} src="/img/sponsors/bonusfinderus.svg" alt="BonusFinder USA" />
        </a>
      </Grid>
    </Container>
  </Dark>
);
