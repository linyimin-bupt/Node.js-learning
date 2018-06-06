## Typescript实现java的hashCode函数

```typescript
import * as int from 'int32'
function hashCode(str: string): number {
  let hash = 0;
  if (hash == 0 && str.length > 0) {
    for (let i = 0; i < str.length; i++) {
      hash = int.add(int.multiply(31, hash), str.charCodeAt(i))
    }
  }
  return hash;
}
```

