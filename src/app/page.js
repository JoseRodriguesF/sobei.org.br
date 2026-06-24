import Image from 'next/image';

export default function Home() {
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
        </div>
      </section>

      {/* Nossa História Section */}
      <section id="sobre" className="about-section">
        <div className="container about-section__container">
          <div className="about-section__content">
            <h2 className="about-section__title">Nossa história</h2>
            <p className="about-section__text">
              Fundada em 1984, a SOBEI (Sociedade Beneficente Equilíbrio de Interlagos) nasceu do sonho de moradores da zona sul de São Paulo de criar um espaço de acolhimento e desenvolvimento para a comunidade local. No início, as ações eram voltadas para o apoio básico a famílias em situação de vulnerabilidade extrema.
            </p>
            <p className="about-section__text">
              Ao longo das últimas quatro décadas, a organização expandiu suas atividades, tornando-se uma das instituições sociais mais respeitadas e atuantes da região metropolitana. Hoje, a SOBEI gerencia diversas creches (CEIs), centros de desenvolvimento social e capacitação profissional, beneficiando milhares de crianças, jovens e adultos diariamente.
            </p>
          </div>
          <div className="about-section__image-wrapper">
            <Image 
              src="/images/WhatsApp Image 2026-06-19 at 11.47.41.jpeg" 
              alt="Crianças brincando nas atividades da SOBEI" 
              width={600} 
              height={450} 
              className="about-section__image"
            />
          </div>
        </div>
      </section>

      {/* Nosso Objetivo Section */}
      <section className="about-section about-section--alt">
        <div className="container about-section__container">
          <div className="about-section__image-wrapper">
            <Image 
              src="/images/WhatsApp Image 2026-06-19 at 11.47.48.jpeg" 
              alt="Educador social ensinando jovens" 
              width={600} 
              height={450} 
              className="about-section__image"
            />
          </div>
          <div className="about-section__content">
            <h2 className="about-section__title">Nosso objetivo</h2>
            <p className="about-section__text">
              O objetivo primordial da SOBEI é promover o equilíbrio social, a educação de qualidade e a capacitação para o mercado de trabalho, atuando de forma integral no desenvolvimento de comunidades vulneráveis da zona sul de São Paulo.
            </p>
            <p className="about-section__text">
              Através de programas educacionais inovadores nas creches, oficinas de capacitação profissional nos CEDESPs, e atividades intergeracionais nos CCINTERs, a instituição busca capacitar indivíduos para que se tornem agentes de mudança de suas próprias realidades, fortalecendo vínculos familiares e promovendo a cidadania ativa.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
