import React from 'react';
import { Link } from 'react-router-dom';

interface LottiePlayerProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  background?: string;
  speed?: string;
  loop?: boolean;
  autoplay?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': LottiePlayerProps;
    }
  }
}

export default function NotFound() {
  const lottieRef = React.useRef<any>(null);
  React.useEffect(() => {
    // Load Lottie Player script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="d-flex align-items-center min-vh-100 py-5">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            <div className="lc-block">
            <div
                ref={lottieRef}
                dangerouslySetInnerHTML={{
                  __html: `
                    <lottie-player
                      src="https://assets9.lottiefiles.com/packages/lf20_kcsr6fcp.json"
                      background="transparent"
                      speed="1"
                      loop
                      autoplay
                    ></lottie-player>
                  `
                }}
              />
            </div>
          </div>
          <div className="col-md-6 text-center text-md-start">
            <div className="lc-block mb-3">
              <h1 className="fw-bold h4">PAGE NOT FOUND!</h1>
            </div>
            <div className="lc-block mb-3">
              <h1 className="display-1 fw-bold text-muted">Error 404</h1>
            </div>
            <div className="lc-block mb-5">
              <p className="rfs-11 fw-light">
                The page you are looking for was moved, removed or might never existed.
              </p>
            </div>
            <div className="lc-block">
              <Link className="btn btn-lg btn-secondary" to="/feeds" role="button">
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}