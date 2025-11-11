import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart,
  type Product 
} from '../store/cartSlice';

/**
 * 샘플 상품 데이터
 */
const sampleProducts: Product[] = [
  { 
    id: 1, 
    name: 'MacBook Pro', 
    price: 2800000,
    image: '💻'
  },
  { 
    id: 2, 
    name: 'iPhone 17 Pro',
    price: 1700000,
    image: '📱'
  },
  { 
    id: 3, 
    name: 'AirPods Pro', 
    price: 350000,
    image: '🎧'
  },
  { 
    id: 4, 
    name: 'Apple Watch', 
    price: 550000,
    image: '⌚'
  },
  { 
    id: 5, 
    name: 'iPad Air', 
    price: 850000,
    image: '📱'
  },
  { 
    id: 6, 
    name: 'Magic Keyboard', 
    price: 180000,
    image: '⌨️'
  },
];

/**
 * Redux Shopping Cart 예제 컴포넌트
 * - Redux Toolkit을 사용한 장바구니 기능 구현
 */
export default function ShoppingCartExample() {
  // dispatch 함수를 useDispatch 훅을 통해 가져옴
  const dispatch = useAppDispatch();

  // useAppSelector 훅을 통해 Redux state 접근하여 CartState 값 가져오기
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalItems = useAppSelector((state) => state.cart.totalItems);

  /**
   * 총 금액 포매팅(원)
   */
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#333', marginBottom: '30px' }}>
        🛒 Redux Shopping Cart 예제
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '20px' }}>
        {/* 상품 목록 */}
        <div>
          <h3 style={{ color: '#333', marginBottom: '20px' }}>상품 목록</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {sampleProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div style={{ fontSize: '48px' }}>{product.image}</div>
                <h4 style={{ margin: 0, color: '#333', textAlign: 'center', fontSize: '14px' }}>
                  {product.name}
                </h4>
                <p style={{ margin: 0, color: '#007bff', fontWeight: 'bold', fontSize: '16px' }}>
                  {formatPrice(product.price)}
                </p>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                >
                  장바구니에 추가
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 장바구니 */}
        <div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, color: '#333' }}>장바구니</h3>
              <span style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {totalItems}개
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#999'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛒</div>
                <p>장바구니가 비어있습니다</p>
              </div>
            ) : (
              <>
                <div style={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  marginBottom: '20px'
                }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #eee',
                        display: 'flex',
                        gap: '15px'
                      }}
                    >
                      <div style={{ fontSize: '32px' }}>{item.image}</div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#333' }}>
                          {item.name}
                        </h4>
                        <p style={{ margin: '0 0 10px 0', color: '#007bff', fontSize: '14px' }}>
                          {formatPrice(item.price)}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            style={{
                              width: '28px',
                              height: '28px',
                              backgroundColor: '#f8f9fa',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '16px'
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            style={{
                              width: '28px',
                              height: '28px',
                              backgroundColor: '#f8f9fa',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '16px'
                            }}
                          >
                            +
                          </button>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            style={{
                              marginLeft: 'auto',
                              padding: '4px 8px',
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    fontSize: '16px'
                  }}>
                    <span>총 상품 수:</span>
                    <span style={{ fontWeight: 'bold' }}>{totalItems}개</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#007bff'
                  }}>
                    <span>총 금액:</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(clearCart())}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}
                >
                  장바구니 비우기
                </button>

                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  구매하기
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 설명 섹션 */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#e7f3ff',
        borderRadius: '8px',
        border: '1px solid #007bff'
      }}>
        <h3 style={{ marginTop: 0, color: '#004085' }}>💡 Redux Toolkit 주요 개념</h3>
        <ul style={{ color: '#004085', lineHeight: '1.8' }}>
          <li style={{ textAlign: 'left'}}><strong>Slice</strong>: 특정 기능의 상태와 리듀서를 하나로 묶은 단위</li>
          <li style={{ textAlign: 'left'}}><strong>PayloadAction</strong>: 액션에 데이터를 전달하는 타입</li>
          <li style={{ textAlign: 'left'}}><strong>Immer</strong>: 불변성을 자동으로 처리해주는 라이브러리 (내장)</li>
          <li style={{ textAlign: 'left'}}><strong>configureStore</strong>: 스토어 설정을 간편하게 해주는 함수</li>
          <li style={{ textAlign: 'left'}}><strong>TypeScript 지원</strong>: 타입 안정성을 보장하는 Hook 사용</li>
        </ul>
      </div>
    </div>
  );
}
