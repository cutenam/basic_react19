/**
 * 무한 스크롤 (Infinite Scroll) 예제
 * 
 * 사용자가 페이지 하단에 도달할 때 자동으로 다음 데이터를 로드하는 기법
 * Intersection Observer API를 사용한 효율적인 구현
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  createdAt: string;
  image: string;
}

/**
 * 서버에서 데이터를 가져옴 (서버 API 시뮬레이션)
 * Fetches a list of posts based on the provided pagination parameters.
 *
 * @param {number} page - The current page number to fetch posts for. Starts at 1.
 * @param {number} pageSize - The number of posts to fetch per page.
 * @returns {Promise<Post[]>} A promise that resolves to an array of posts.
 */
const fetchPosts = (page: number, pageSize: number): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts: Post[] = [];
      const startId = (page - 1) * pageSize + 1;
      
      for (let i = 0; i < pageSize; i++) {
        const id = startId + i;
        posts.push({
          id,
          title: `게시물 제목 ${id}`,
          content: `이것은 ${id}번 게시물의 내용입니다. 무한 스크롤을 통해 자동으로 로드됩니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          author: `사용자${(id % 20) + 1}`,
          likes: Math.floor(Math.random() * 1000),
          comments: Math.floor(Math.random() * 100),
          createdAt: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
          image: `https://picsum.photos/seed/${id}/400/250`,
        });
      }
      
      resolve(posts);
    }, 1000); // 네트워크 지연 시뮬레이션
  });
};

const InfiniteScrollExample: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);  // 데이터를 불러오는 중인지 여부
  const [hasMore, setHasMore] = useState(true);   // 더 이상 로드할 데이터가 있는지 여부
  const observerTarget = useRef<HTMLDivElement>(null);  // 관찰할 대상 요소
  
  const PAGE_SIZE = 10;
  const MAX_POSTS = 100; // 최대 포스트 수 (무한 스크롤 종료 조건)

  /**
   * 스크롤 시 데이터를 로드하는 함수
   *
   * Loads more posts asynchronously when invoked.
   * Handles pagination and updates the list of posts.
   * Prevents redundant calls if already loading or if there are no more posts.
   * Automatically determines if the maximum number of posts has been reached to stop further loading.
   *
   * Dependencies:
   * - `page`: The current page number used for fetching posts.
   * - `loading`: A boolean indicating whether a loading operation is already in progress.
   * - `hasMore`: A boolean that determines whether more posts can be loaded.
   * - `posts.length`: Length of the current list of posts, used to manage pagination.
   *
   * Effects:
   * - Updates the `loading` state during the lifecycle of the asynchronous operation.
   * - Appends newly fetched posts to the existing list of posts.
   * - Increments the page number for the next fetch operation.
   * - Updates the `hasMore` state if the maximum post count is reached.
   *
   * Handles errors gracefully by logging them to the console.
   */
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newPosts = await fetchPosts(page, PAGE_SIZE);
      
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
      
      // 최대 포스트 수에 도달했는지 확인
      if (posts.length + newPosts.length >= MAX_POSTS) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, posts.length]);

  // Intersection Observer 설정
  useEffect(() => {

    // 1. Observer 생성 : IntersectionObserver 인스턴스 생성
    // IntersectionObserver : 브라우저 네이티브 API, 특정 요소가 뷰포트(화면)에 보이는지 감지하는 기능을 제공
    const observer = new IntersectionObserver(
      // 1. Callback 함수 (entries) => {...} : entries: 관찰 중인 요소들의 배열
      (entries) => {
        // 요소가 뷰포트에 보이는지 여부 (boolean)
        if (entries[0].isIntersecting && hasMore && !loading) {
          void loadMore();
        }
      },
      // 2. Options 객체 { threshold: 0.1 }: threshold: 콜백이 실행되는 시점을 결정 (0.0 ~ 1.0)
      { threshold: 0.5 }
      /**
       * 0.0: 요소가 1px이라도 보이면 실행
       * 0.1: 요소의 10%가 보이면 실행
       * 0.5: 요소의 50%가 보이면 실행
       * 1.0: 요소가 100% 보이면 실행
       */
    );

    // 2. 관찰할 요소 지정 및 관찰 시작
    const currentTarget = observerTarget.current; // <div ref={observerTarget} />
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    // 3. cleanup
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, hasMore, loading]);

  // 컴포넌트 마운트 시 첫 데이터 로드
  useEffect(() => {
    void loadMore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 데이터 초기화
  const handleReset = () => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>♾️ 무한 스크롤 (Infinite Scroll)</h2>
        <p style={styles.description}>
          현재 {posts.length}개의 게시물 로드됨 
          {hasMore ? ' · 스크롤하여 더 보기' : ' · 모든 게시물을 불러왔습니다'}
        </p>
      </div>

      <div style={styles.controls}>
        <button style={styles.button} onClick={handleReset}>
          🔄 리셋
        </button>
      </div>

      <div style={styles.postsContainer}>
        {posts.map((post) => (
          <div key={post.id} style={styles.postCard}>
            <div style={styles.postImage}>
              <img src={post.image} alt={post.title} style={styles.image} />
            </div>
            <div style={styles.postContent}>
              <div style={styles.postHeader}>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <span style={styles.postId}>#{post.id}</span>
              </div>
              <p style={styles.postText}>{post.content}</p>
              <div style={styles.postMeta}>
                <span style={styles.author}>👤 {post.author}</span>
                <span style={styles.stat}>❤️ {post.likes}</span>
                <span style={styles.stat}>💬 {post.comments}</span>
                <span style={styles.date}>📅 {post.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 로딩 인디케이터 */}
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>게시물을 불러오는 중...</p>
        </div>
      )}

      {/* 더 이상 로드할 항목이 없을 때 */}
      {!hasMore && posts.length > 0 && (
        <div style={styles.endMessage}>
          ✅ 모든 게시물을 불러왔습니다!
        </div>
      )}

      {/* Intersection Observer 타겟 */}
      <div ref={observerTarget} style={styles.observerTarget} />

      {/* 정보 섹션 */}
      <div style={styles.info}>
        <h3 style={styles.infoTitle}>💡 무한 스크롤이란?</h3>
        <ul style={styles.infoList}>
          <li>사용자가 페이지 하단에 도달하면 <strong>자동으로 다음 콘텐츠를 로드</strong></li>
          <li><strong>Intersection Observer API</strong>를 사용하여 효율적으로 스크롤 감지</li>
          <li>페이지 전환 없이 <strong>끊김 없는 사용자 경험</strong> 제공</li>
          <li>모바일 앱과 같은 자연스러운 UX</li>
        </ul>

        <h3 style={styles.infoTitle}>🎯 사용 사례</h3>
        <ul style={styles.infoList}>
          <li>소셜 미디어 피드 (Facebook, Instagram, Twitter)</li>
          <li>이미지 갤러리, Pinterest 스타일 레이아웃</li>
          <li>뉴스 피드, 블로그 목록</li>
          <li>검색 결과 (연속적인 탐색이 필요한 경우)</li>
        </ul>

        <h3 style={styles.infoTitle}>⚠️ 주의사항</h3>
        <ul style={styles.infoList}>
          <li>Footer나 특정 위치로 이동하기 어려울 수 있음</li>
          <li>SEO에 불리할 수 있음 (초기 렌더링에 모든 콘텐츠가 포함되지 않음)</li>
          <li>뒤로가기 시 스크롤 위치 복원이 어려울 수 있음</li>
          <li>"더보기" 버튼과 병행하여 사용자에게 선택권을 주는 것도 좋은 방법</li>
        </ul>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    backgroundColor: '#fef3c7',
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #f59e0b',
  },
  controls: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#8b5cf6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  postImage: {
    width: '100%',
    height: '250px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  postContent: {
    padding: '16px',
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  postTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
  },
  postId: {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '500',
  },
  postText: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.6',
    marginBottom: '12px',
  },
  postMeta: {
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
    color: '#6b7280',
  },
  author: {
    fontWeight: '500',
  },
  stat: {},
  date: {},
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f4f6',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    fontSize: '14px',
    color: '#6b7280',
  },
  endMessage: {
    textAlign: 'center',
    padding: '40px 20px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#059669',
    backgroundColor: '#d1fae5',
    borderRadius: '8px',
    margin: '20px 0',
  },
  observerTarget: {
    height: '20px',
  },
  info: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#374151',
  },
  infoList: {
    marginLeft: '20px',
    marginBottom: '15px',
    lineHeight: '1.8',
    color: '#4b5563',
  },
};

// 스피너 애니메이션을 위한 CSS 추가 (인라인 스타일에서는 keyframes를 직접 사용할 수 없으므로)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default InfiniteScrollExample;
