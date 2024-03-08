```typescript
const AuthStatus = () => {
  const [uid, setUid] = useState('None');
  const [user, setUser] = useState(null)
  useEffect(()=>{
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user)
        setUid(uid)
      } else {
        setUid('')
      }
    });

  }, [])

  const handleLogout = () => {
    signOut(firebaseAuth).then(() => {
      // Sign-out successful.
      // navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  }
  const verifyToken = async () => {
    if(!user) return;
    const token = await getIdToken(user);
    console.log('verifyToken token:')
    console.log(token)
    fetch("http://127.0.0.1:8000/api/web/me", {
        headers: {
          'Authorization': `Basic ${token}`,
        }
      }
    )
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      )
  }
  if (uid) {
    return (<section>
      <p>Uid: {uid}</p>
    <button onClick={handleLogout}>Logout</button>
      <button onClick={verifyToken}>Verify</button>
      </section>)
  }
  return (
    <section>
      <p>Uid: None</p>
  </section>
)
}

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  }

  return (
    <main >
      <section>
        <div>
          <div>
            <h1> FocusApp </h1>
    <form>
    <div>
      <label htmlFor="email-address">
      Email address
  </label>
  <input
  type="email"
  label="Email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  placeholder="Email address"
  />
  </div>

  <div>
  <label htmlFor="password">
    Password
    </label>
    <input
  type="password"
  label="Create password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  placeholder="Password"
    />
    </div>

    <button
  type="submit"
  onClick={onSubmit}
    >
    Sign up
  </button>

  </form>

  <p>
  Already have an account?{' '}
    <NavLink to="/login" >
    Sign in
    </NavLink>
    </p>
    </div>
    </div>
    </section>
    </main>
)
}
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // navigate("/home")
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });

  }

  return(
    <>
      <main >
        <section>
          <div>
            <p> FocusApp </p>

    <form>
    <div>
      <label htmlFor="email-address">
      Email address
  </label>
  <input
  id="email-address"
  name="email"
  type="email"
  required
  placeholder="Email address"
  onChange={(e)=>setEmail(e.target.value)}
  />
  </div>

  <div>
  <label htmlFor="password">
    Password
    </label>
    <input
  id="password"
  name="password"
  type="password"
  required
  placeholder="Password"
  onChange={(e)=>setPassword(e.target.value)}
  />
  </div>

  <div>
  <button
    onClick={onLogin}
    >
    Login
    </button>
    </div>
    </form>

    <p className="text-sm text-white text-center">
    No account yet? {' '}
    <NavLink to="/signup">
    Sign up
  </NavLink>
  </p>

  </div>
  </section>
  </main>
  </>
)
}

```