import React from "react";
import Image from "next/image";
export default function BlogDetails({ blog }) {
  return (
    <>
      <div className="blog-detail">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="blog-detail-main">
                <div className="blog-detail-main-heading">
                  {/* {blog.seo?.keywords && (
                    <ul className="tags-lists justify-content-center">
                      <li>
                        <span className="tags-item">
                          {blog.seo.keywords}
                        </span>
                      </li>
                    </ul>
                  )} */}
                  <div className="title">{blog.title}</div>
                  <div className="meta">
                    <span>{new Date(blog.published_at || blog.created_at).toLocaleDateString('tr-TR')}</span> tarihinde yayınlandı
                  </div>
                  {blog.image?.url && typeof blog.image.url === "string" && blog.image.url.trim() !== "" && (
                    <div className="image">
                      <Image
                        className="lazyload"
                        alt={blog.title}
                        src={blog.image.url}
                        width={1100}
                        height={707}
                      />
                    </div>
                  )}
                </div>

                <div
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: String(blog?.content || "") }}
                />

                <div className="bot d-flex justify-content-between flex-wrap align-items-center">
                  <ul className="tags-lists">
                    <li>
                      <a href="#" className="tags-item">
                        <span>Accessories</span>
                      </a>
                    </li>
                  </ul>
                  <div className="d-flex align-items-center gap-20">
                    <p>Share:</p>
                    <ul className="tf-social-icon d-flex style-default">
                      <li>
                        <a
                          href="#"
                          className="box-icon round social-facebook border-line-black"
                        >
                          <i className="icon fs-14 icon-fb" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="box-icon round social-twiter border-line-black"
                        >
                          <i className="icon fs-12 icon-Icon-x" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="box-icon round social-instagram border-line-black"
                        >
                          <i className="icon fs-14 icon-instagram" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="box-icon round social-tiktok border-line-black"
                        >
                          <i className="icon fs-14 icon-tiktok" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="box-icon round social-pinterest border-line-black"
                        >
                          <i className="icon fs-14 icon-pinterest-1" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="tf-article-navigation">
                  <div className="item position-relative d-flex w-100 prev">
                    <a href="#" className="icon">
                      <i className="icon-arrow-left" />
                    </a>
                    <div className="inner">
                      <a href="#">PREVIOUS</a>
                      <h6>
                        <a href="#">
                          Fashionista editors reveal their designer
                        </a>
                      </h6>
                    </div>
                  </div>
                  <div className="item position-relative d-flex w-100 justify-content-end next">
                    <div className="inner text-end">
                      <a href="#">NEXT</a>
                      <h6>
                        <a href="#">
                          The next generation of leather alternatives
                        </a>
                      </h6>
                    </div>
                    <a href="#" className="icon">
                      <i className="icon-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-sidebar-mobile d-flex">
        <button
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarmobile"
          aria-controls="offcanvasRight"
        >
          <i className="icon-open" />
        </button>
      </div>
    </>
  );
}
