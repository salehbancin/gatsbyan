import Layout from "../components/Layout";
import SEO from "../components/SEO";
import "./blog-post.css";
import Sidebar from "../components/sidebar/Sidebar";
import Share from "../components/Share";
import { getPlurals, getTechTags } from "../utils/GatsbyanUtils";
import React from "react";
import { graphql } from "gatsby";
import retext from "retext";
import pos from "retext-pos";
import keywords from "retext-keywords";
import toString from 'nlcst-to-string'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulBlogPost;
    const site = this.props.data.site.siteMetadata;
    const timeToRead = post.body.childMarkdownRemark.timeToRead;
    const url = `${site.siteUrl}/blog/${post.slug}`;
    let keyword = this.getKeywords(post.body.childMarkdownRemark.plainText);

    const imageURL = `https:${post.heroImage.file.url}`;
    return (
      <Layout>
        <SEO
          title={post.title}
          description={post.description.description}
          image={imageURL}
          url={url}
          keywords={keyword}
        />
        <div className="post-page-main">
          <div className="sidebar border-right px-4 py-2">
            <Sidebar />
          </div>

          <div className="post-main">
            <div>
              <h3 className="title">{post.title}</h3>
              <div className="title text-info">
                <span className="page-info">{post.publishDate}</span>
                <span className="page-info">
                  {timeToRead} min{getPlurals(timeToRead)} read
                </span>
                <br />
                <span className="page-info">{getTechTags(post.tags)}</span>
              </div>
              <div className="d-inline-block">
                <div
                  className="pt-3"
                  dangerouslySetInnerHTML={{
                    __html: post.body.childMarkdownRemark.html,
                  }}
                />
              </div>
              <Share title={post.title} siteName={site.title} url={url} />
            </div>
          </div>
          <div className="sidebar px-4 py-2">{/*<Sidebar />*/}</div>
        </div>
      </Layout>
    );
  }

  getKeywords(description) {
    let keyword = [];
    retext()
      .use(pos)
      .use(keywords, {maximum: 10})
      .process(description, function(err, file) {
        file.data.keyphrases.forEach(function(phrase) {
          keyword.push(phrase.matches[0].nodes.map(toString).join(""));
        });
      });
    return keyword;
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      body {
        childMarkdownRemark {
          html
          timeToRead
            plainText
        }
      }
      description {
        description
      }
      heroImage {
        file {
          url
        }
      }
      tags
      slug
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
