# 🚗 BMW 딜러사 - TypeScript 정석

**정확한 Next.js 구조:**
- ✅ **조회(GET)**: Client에서 `fetch` 사용
- ✅ **신청(POST/DELETE)**: Server Action + `FormData` 사용
- ✅ **CSS Modules**: `module.css` 사용
- ✅ **TypeScript**: 완전한 타입 안정성

---

## 📊 구조

```
app/
├── components/              # Client Components
│   ├── RegionSelect.tsx     # fetch로 조회
│   ├── DealerSelect.tsx     # fetch로 조회
│   ├── VehicleList.tsx      # fetch로 조회
│   ├── VehicleCard.tsx
│   ├── CustomerForm.tsx
│   ├── AgreementCheckbox.tsx
│   └── ApplicationForm.tsx  # Server Action 호출
│
├── actions/
│   └── application.ts       # Server Action (FormData)
│
├── styles/                  # CSS Modules
│   ├── page.module.css
│   ├── form.module.css
│   ├── vehicle.module.css
│   ├── select.module.css
│   ├── agreement.module.css
│   └── globals.css
│
├── page.tsx                 # Server Component
└── layout.tsx

types/
└── index.ts                 # TypeScript 타입

db.json                       # JSON Server
```

---

## 🚀 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인

---

## 💡 핵심 개념

### 조회는 Client에서 fetch
```typescript
// RegionSelect.tsx (Client)
useEffect(() => {
  const fetchRegions = async () => {
    const response = await fetch("http://localhost:3001/regions");
    const data = await response.json();
    setRegions(data);
  };
  fetchRegions();
}, []);
```

### 신청은 Server Action + FormData
```typescript
// actions/application.ts (Server)
"use server";

export async function submitApplicationAction(
  _: unknown,
  formData: FormData
) {
  const vehicleId = formData.get("vehicleId")?.toString();
  // ... 데이터 처리
}

// ApplicationForm.tsx (Client)
const formDataObj = new FormData();
formDataObj.append("vehicleId", selectedVehicle.id.toString());
const result = await submitApplicationAction(undefined, formDataObj);
```

### CSS Modules
```typescript
import styles from "@/app/styles/form.module.css";

export default function Form() {
  return <div className={styles.section}>...</div>;
}
```

---

**정석적인 Next.js 구조로 배우세요! 🎓**
