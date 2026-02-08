# Project Guidelines

<!-- NUXT-DEVTOOLS:CRITICAL-FILES -->

## ⚠️ Critical Configuration Files

The following files trigger a full Nuxt restart when modified:

- `nuxt.config.ts`
- `nuxt.config.js`
- `app.config.ts`
- `app.config.js`
- `.nuxtrc`
- `tsconfig.json`

### 🔴 MANDATORY CHECK (EVERY TIME, NO EXCEPTIONS)

**BEFORE modifying ANY of these files, you MUST:**

```
1. READ .claude-devtools/settings.json
2. CHECK criticalFiles.autoConfirm value
3. IF false OR file missing → STOP and ASK user
4. IF true → inform user, then proceed
```

**This check is REQUIRED every single time, even if you checked before in this session.**

### Order of Operations

1. **Complete ALL prerequisite tasks FIRST**
   - Create all new files that will be referenced
   - Install all dependencies
   - Write all related code

2. **Verify prerequisites exist**
   - All files referenced in config change must exist
   - All imports must be valid

3. **Check settings file** (read `.claude-devtools/settings.json`)

4. **Act based on autoConfirm setting**

### Example: Adding i18n locale

```
Step 1: Create locales/es.json           ✓ prerequisite
Step 2: Read .claude-devtools/settings.json  ✓ check flag
Step 3: If autoConfirm=false → ask user
Step 4: Update nuxt.config.ts            ✓ only after confirmation
```

### Current Setting

**autoConfirm: DISABLED**

→ MUST ask user and WAIT for explicit "yes" before proceeding.

---

After restart, conversation history is preserved. User can send "continue" to resume.

<!-- /NUXT-DEVTOOLS:CRITICAL-FILES -->
