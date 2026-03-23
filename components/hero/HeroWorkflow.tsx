import Image from "next/image";

type HeroWorkflowFallbackImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type HeroWorkflowProps = {
  fallbackImage?: HeroWorkflowFallbackImage;
};

export function HeroWorkflow({ fallbackImage }: HeroWorkflowProps) {
  return (
    <div aria-label="Shotgun workflow animation" className="hero-workflow" role="img">
      <div className="hero-workflow__animated">
        <div className="hero-workflow__frame">
          <div className="hero-workflow__store">
            <header className="hero-workflow__brand-header">
              <span className="hero-workflow__brand">Pure Glow</span>
              <nav aria-label="Store categories" className="hero-workflow__store-nav">
                <span>Shop</span>
                <span>Skincare</span>
                <span>Best Sellers</span>
                <span>About</span>
              </nav>
              <span aria-hidden className="hero-workflow__cart-icon">
                🛒
              </span>
            </header>

            <div className="hero-workflow__banner hero-workflow__banner--before">
              <p className="hero-workflow__banner-title">✨ Summer Skincare Sale</p>
              <span className="hero-workflow__banner-cta">Shop Skincare →</span>
            </div>

            <div className="hero-workflow__banner hero-workflow__banner--after">
              <p className="hero-workflow__banner-title">✨ Summer Skincare Sale</p>
              <span className="hero-workflow__banner-cta">Shop Skincare →</span>
              <span className="hero-workflow__banner-link">Links to Skincare Collection</span>
              <span aria-hidden className="hero-workflow__check">
                ✓
              </span>
            </div>

            <div className="hero-workflow__categories">
              <span>🌿 Skincare</span>
              <span>💧 Serums</span>
              <span>✨ Best Sellers</span>
            </div>

            <article className="hero-workflow__product">
              <span className="hero-workflow__badge">Best Seller</span>
              <div className="hero-workflow__product-image" aria-hidden>
                <div className="hero-workflow__bottle" />
                <div className="hero-workflow__bottle-cap" />
              </div>
              <p className="hero-workflow__product-title">Vitamin C Serum</p>
              <p className="hero-workflow__product-price">$29.99</p>
              <p className="hero-workflow__product-rating" aria-label="5 star rating">
                ★★★★★
              </p>
              <button className="hero-workflow__product-cta" type="button">
                Add to cart
              </button>
            </article>
          </div>

          <div className="hero-workflow__bubble hero-workflow__bubble--founder">
            Make the homepage banner clickable
          </div>

          <div className="hero-workflow__bubble hero-workflow__bubble--HeyKrish">Working on it</div>

          <div className="hero-workflow__done">
            <strong>Task completed</strong>
            <span>Homepage banner now links to collection page</span>
          </div>
        </div>
      </div>

      <div className="hero-workflow__static">
        {fallbackImage ? (
          <Image
            alt={fallbackImage.alt}
            className="hero-workflow__static-image"
            height={fallbackImage.height ?? 420}
            src={fallbackImage.src}
            width={fallbackImage.width ?? 640}
          />
        ) : (
          <div className="hero-workflow__static-card">
            <header className="hero-workflow__brand-header">
              <span className="hero-workflow__brand">Pure Glow</span>
              <span aria-hidden className="hero-workflow__cart-icon">
                🛒
              </span>
            </header>
            <div className="hero-workflow__banner hero-workflow__banner--after hero-workflow__banner--after-static">
              <p className="hero-workflow__banner-title">✨ Summer Skincare Sale</p>
              <span className="hero-workflow__banner-cta">Shop Skincare →</span>
              <span className="hero-workflow__banner-link">Links to Skincare Collection</span>
              <span aria-hidden className="hero-workflow__check">
                ✓
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
