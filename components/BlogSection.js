import { motion } from "framer-motion";

export default function BlogSection({ isActive }) {
  const animations = {
    startShow: { opacity: 0, scale: 0.5, visibility: "hidden" },
    finishShow: { opacity: 1, scale: 1, visibility: "visible" },
  };

  const start = isActive ? animations.startShow : animations.finishShow;
  const finish = isActive ? animations.finishShow : animations.startShow;

  console.log("isActive", isActive);
  console.log("start", start);
  console.log("finish", finish);
  return (
    <motion.section
      initial={start}
      animate={finish}
      data-id="blog"
      className="animated-section"
    >
      <div className="section-content">
        <div className="page-title">
          <h2>Blog</h2>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="blog-masonry two-columns clearfix">
              <div className="item post-1">
                <div className="blog-card">
                  <div className="media-block">
                    <div className="category">
                      <a href="#" title="View all posts in Design">
                        Design
                      </a>
                    </div>
                    <a href="blog-post-1.html">
                      <img
                        src="img/blog/blog_post_1.jpg"
                        className="size-blog-masonry-image-two-c"
                        alt="Why I Switched to Sketch For UI Design"
                        title=""
                      />
                      <div className="mask"></div>
                    </a>
                  </div>
                  <div className="post-info">
                    <div className="post-date">05 Mar 2020</div>
                    <a href="blog-post-1.html">
                      <h4 className="blog-item-title">
                        Why I Switched to Sketch For UI Design
                      </h4>
                    </a>
                  </div>
                </div>
              </div>

              <div className="item post-2">
                <div className="blog-card">
                  <div className="media-block">
                    <div className="category">
                      <a href="#" title="View all posts in UI">
                        UI
                      </a>
                    </div>
                    <a href="blog-post-1.html">
                      <img
                        src="img/blog/blog_post_2.jpg"
                        className="size-blog-masonry-image-two-c"
                        alt="Best Practices for Animated Progress Indicators"
                        title=""
                      />
                      <div className="mask"></div>
                    </a>
                  </div>
                  <div className="post-info">
                    <div className="post-date">23 Feb 2020</div>
                    <a href="blog-post-1.html">
                      <h4 className="blog-item-title">
                        Best Practices for Animated Progress Indicators
                      </h4>
                    </a>
                  </div>
                </div>
              </div>

              <div className="item post-1">
                <div className="blog-card">
                  <div className="media-block">
                    <div className="category">
                      <a href="#" title="View all posts in Design">
                        Design
                      </a>
                    </div>
                    <a href="blog-post-1.html">
                      <img
                        src="img/blog/blog_post_3.jpg"
                        className="size-blog-masonry-image-two-c"
                        alt="Designing the Perfect Feature Comparison Table"
                        title=""
                      />
                      <div className="mask"></div>
                    </a>
                  </div>
                  <div className="post-info">
                    <div className="post-date">06 Feb 2020</div>
                    <a href="blog-post-1.html">
                      <h4 className="blog-item-title">
                        Designing the Perfect Feature Comparison Table
                      </h4>
                    </a>
                  </div>
                </div>
              </div>

              <div className="item post-2">
                <div className="blog-card">
                  <div className="media-block">
                    <div className="category">
                      <a href="#" title="View all posts in E-Commerce">
                        UI
                      </a>
                    </div>
                    <a href="blog-post-1.html">
                      <img
                        src="img/blog/blog_post_4.jpg"
                        className="size-blog-masonry-image-two-c"
                        alt="An Overview of E-Commerce Platforms"
                        title=""
                      />
                      <div className="mask"></div>
                    </a>
                  </div>
                  <div className="post-info">
                    <div className="post-date">07 Jan 2020</div>
                    <a href="blog-post-1.html">
                      <h4 className="blog-item-title">
                        An Overview of E-Commerce Platforms
                      </h4>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
