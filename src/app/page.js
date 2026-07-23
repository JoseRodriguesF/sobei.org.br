import Image from 'next/image';
import { Fragment } from 'react';
import EventVideo from '@/components/EventVideo';

export default function Home() {
  const subtitleText = "Dedicando o melhor de cada um para o melhor de todos";
  const words = subtitleText.split(' ');

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <Image
            src="/images/LOGO BRANCO.png"
            alt="SOBEI"
            width={560}
            height={160}
            className="hero__logo"
            priority
          />
          <p className="hero__subtitle">
            {words.map((word, wordIdx) => {
              const previousCharsCount = words.slice(0, wordIdx).join(' ').length + (wordIdx > 0 ? 1 : 0);
              return (
                <Fragment key={wordIdx}>
                  <span className="hero__subtitle-word">
                    {word.split('').map((char, charIdx) => {
                      const globalIdx = previousCharsCount + charIdx;
                      return (
                        <span
                          key={charIdx}
                          className="hero__subtitle-char"
                          style={{ animationDelay: `${0.8 + globalIdx * 0.03}s` }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                  {/* Espaço após a palavra, exceto se for a última */}
                  {wordIdx < words.length - 1 && ' '}
                </Fragment>
              );
            })}
          </p>
          <p className="hero__description">
            Transformando vidas por meio da educação, acolhimento e desenvolvimento social
            <br />
            na Zona Sul de São Paulo há 42 anos.
          </p>
          <a href="#inicio" className="hero__button">
            Conheça nossa história
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hero__button-icon"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Nossa História Section */}
      <section className="about-section" id="sobre">
        {/* Section Header */}
        <div className="container about-header">
          <h2 className="about-header__title">Nossa História</h2>
        </div>
        {/* Story Block 1 — Text Left, Image Right */}
        <div className="container about-row">
          <div className="about-row__text">
            <h3 className="about-row__heading" id="inicio">O início de tudo</h3>
            <p className="about-row__paragraph">
              Fundada em 31 de março de 1984 por membros da Loja Maçônica Fé, Equilíbrio e Luz nº 270, a SOBEI nasceu do desejo de amparar famílias em situação de vulnerabilidade social na Zona Sul de São Paulo, iniciando sua trajetória com uma creche comunitária voltada para 33 crianças da região.
            </p>
            <p className="about-row__paragraph">
              A partir desse início simples, a instituição cresceu e expandiu sua infraestrutura para acompanhar as demandas locais. Hoje, mais de quatro décadas depois, preservamos a mesma essência acolhedora e o foco na dignidade humana que guiaram os nossos primeiros passos.
            </p>
          </div>
          <div className="about-row__image-wrapper">
            <Image
              src="/images/cei-imbuias.jpg"
              alt="Crianças brincando nas atividades da SOBEI"
              width={600}
              height={450}
              sizes="(max-width: 768px) 100vw, 600px"
              className="about-row__image"
              priority
            />
          </div>
        </div>

        {/* Story Block 2 — Image Left, Text Right */}
        <div className="container about-row about-row--reverse">
          <div className="about-row__text">
            <h3 className="about-row__heading">Impacto que transforma</h3>
            <p className="about-row__paragraph">
              Hoje, a SOBEI atua como um pilar de apoio e desenvolvimento que atende diretamente cerca de 7 mil pessoas todos os dias. Gerenciamos 13 Centros de Educação Infantil (CEIs) que oferecem ensino integral e nutrição para 4.500 crianças, além de coordenarmos outros 5 projetos focados em inclusão, formação técnica e apoio intergeracional.
            </p>
            <p className="about-row__paragraph">
              Com uma atuação presente em Cidade Dutra, Vila São José, Grajaú e Parelheiros, nossos 18 serviços e projetos promovem autonomia e criam oportunidades de desenvolvimento para todas as idades, auxiliando a comunidade local a construir uma trajetória com dignidade e cidadania.
            </p>
          </div>
          <div className="about-row__image-wrapper">
            <Image
              src="/images/nci-bela-vista.jpg"
              alt="Educador social ensinando jovens"
              width={600}
              height={450}
              sizes="(max-width: 768px) 100vw, 600px"
              className="about-row__image"
            />
          </div>
        </div>
      </section>

      {/* Nosso Objetivo Section */}
      <section className="about-section about-section--alt">
        <div className="container about-header">
          <h2 className="about-header__title">Nosso Objetivo</h2>
        </div>

        <div className="container about-row">
          <div className="about-row__text">
            <h3 className="about-row__heading">Missão</h3>
            <p className="about-row__paragraph">
              Nossa missão primordial é promover a dignidade humana e a autovalorização de famílias e indivíduos em situação de vulnerabilidade e risco social. Através do acolhimento afetivo e de uma educação cidadã, atuamos como um agente de emancipação para que cada pessoa se torne protagonista de sua história.
            </p>
            <p className="about-row__paragraph">
              Trabalhamos para estruturar redes de apoio eficientes que facilitem o desenvolvimento integral das crianças, a qualificação profissional de jovens e adultos para o mercado de trabalho, e a convivência e bem-estar de idosos, garantindo suporte humanizado em cada etapa da vida.
            </p>
          </div>
          <div className="about-row__image-wrapper">
            <Image
              src="/images/cedesp-qualificacao.jpg"
              alt="Qualificação profissional no CEDESP"
              width={600}
              height={450}
              sizes="(max-width: 768px) 100vw, 600px"
              className="about-row__image"
            />
          </div>
        </div>

        <div className="container about-row about-row--reverse">
          <div className="about-row__text">
            <h3 className="about-row__heading">Visão e Valores</h3>
            <p className="about-row__paragraph">
              Buscamos ser referência de excelência nacional na cocriação e execução de políticas públicas integradas nas áreas de educação e assistência social. Almejamos liderar iniciativas que unam qualidade pedagógica, transparência de gestão e um impacto social sustentável na comunidade.
            </p>
            <p className="about-row__paragraph">
              Nossa conduta diária é pautada por cinco pilares essenciais: a ética nas relações, o respeito profundo à diversidade humana, a solidariedade prática no cotidiano, o acolhimento afetuoso que gera segurança, e o permanente compromisso com a transformação social e igualdade.
            </p>
          </div>
          <div className="about-row__image-wrapper">
            <Image
              src="/images/cei-leblon.jpg"
              alt="CEI Leblon — atividades com crianças"
              width={600}
              height={450}
              sizes="(max-width: 768px) 100vw, 600px"
              className="about-row__image"
            />
          </div>
        </div>
      </section>

      {/* Eventos Section */}
      <section className="about-section">
        {/* Section Header */}
        <div className="container about-header">
          <h2 className="about-header__title">Nossos Eventos</h2>
        </div>

        <div className="container about-events" style={{ marginTop: '0' }}>
          <div className="events-grid">
            {/* Event 1 */}
            <div className="event-card">
              <div className="event-card__video-wrapper">
                <EventVideo src="/videos/Churrasco.mp4" />
              </div>
              <div className="event-card__content">
                <h4 className="event-card__title">Churrasco</h4>
                <p className="event-card__text">
                  Um encontro especial que reúne apoiadores, parceiros e a comunidade em geral para saborear um tradicional churrasco em prol da sustentabilidade das nossas ações sociais.
                </p>
              </div>
            </div>

            {/* Event 2 */}
            <div className="event-card">
              <div className="event-card__video-wrapper">
                <EventVideo src="/videos/Feijoada.mp4" />
              </div>
              <div className="event-card__content">
                <h4 className="event-card__title">Feijoada</h4>
                <p className="event-card__text">
                  Evento gastronômico tradicional repleto de carinho e união, preparado especialmente para arrecadar fundos e aproximar a comunidade de nossas causas sociais.
                </p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="event-card">
              <div className="event-card__video-wrapper">
                <EventVideo src="/videos/FestaJunina.mp4" />
              </div>
              <div className="event-card__content">
                <h4 className="event-card__title">Festa Junina</h4>
                <p className="event-card__text">
                  Uma das comemorações mais queridas e tradicionais da instituição, com barracas típicas, danças, pratos tradicionais e muita diversão para todas as famílias atendidas.
                </p>
              </div>
            </div>

            {/* Event 4 */}
            <div className="event-card">
              <div className="event-card__video-wrapper">
                <EventVideo src="/videos/BrooklinFest.mp4" />
              </div>
              <div className="event-card__content">
                <h4 className="event-card__title">Brooklin Fest</h4>
                <p className="event-card__text">
                  Participação ativa da SOBEI em um dos maiores festivais multiculturais da região, divulgando nossos projetos e comercializando produtos artesanais produzidos em nossas oficinas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
