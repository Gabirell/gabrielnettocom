import styled from 'styled-components';

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const Header = styled.div`
  border: 2px solid var(--terminal-green);
  padding: 20px;
  margin-bottom: 30px;
  background: rgba(0, 255, 0, 0.05);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 2rem;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  text-shadow: 0 0 10px var(--terminal-green);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 1rem;
  margin: 0;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ComingSoon = styled.div`
  border: 1px dashed var(--terminal-green);
  padding: 40px 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const ComingSoonText = styled.div`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 1.5rem;
  margin-bottom: 20px;
  animation: flicker 3s infinite alternate;

  @keyframes flicker {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.9; }
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FeatureList = styled.ul`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 1rem;
  text-align: left;
  max-width: 500px;
  margin: 20px auto 0;
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const FeatureItem = styled.li`
  margin: 8px 0;
  padding-left: 20px;
  position: relative;

  &:before {
    content: '→';
    position: absolute;
    left: 0;
    color: #fff;
  }
`;

const Blog = () => {
    return (
        <BlogContainer>
            <Header>
                <Title>// Blog & Updates</Title>
                <Subtitle>
                    Publications, tutorials, project updates, and thoughts
                </Subtitle>
            </Header>

            <ComingSoon>
                <ComingSoonText>
                    [ BLOG SYSTEM IN DEVELOPMENT ]
                </ComingSoonText>
                <FeatureList>
                    <FeatureItem>Markdown-based blog posts</FeatureItem>
                    <FeatureItem>Auto-posting to LinkedIn, Instagram, TikTok, YouTube</FeatureItem>
                    <FeatureItem>RSS feed generation</FeatureItem>
                    <FeatureItem>Project update notifications</FeatureItem>
                    <FeatureItem>Tutorial series on educational games</FeatureItem>
                </FeatureList>
            </ComingSoon>
        </BlogContainer>
    );
};

export default Blog;
