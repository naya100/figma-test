const StyleDictionary = require('style-dictionary');

// 1rem = 10px 변환을 위한 커스텀 Transform 등록
StyleDictionary.registerTransform({
  name: 'size/px-to-rem',
  type: 'value',
  matcher: (prop) => prop.attributes.category === 'size',
  transformer: (prop) => {
    const baseSize = 10; // 1rem = 10px
    return `${parseFloat(prop.value) / baseSize}rem`;
  },
});

// Style Dictionary 설정 확장
module.exports = {
  source: ['tokens/design-tokens.tokens.json'], // 토큰이 들어있는 JSON 경로
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['size/px-to-rem', 'name/cti/kebab'], // px → rem 변환 적용
      buildPath: 'build/css/', // 생성될 CSS 파일 경로
      files: [
        {
          destination: 'variables.css', // 최종 CSS 파일명
          format: 'css/variables'
        }
      ]
    }
  }
};