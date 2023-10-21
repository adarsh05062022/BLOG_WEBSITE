const createConnection = require("../../database");
const jwt = require("jsonwebtoken");
const secret_key = "anmol";

const getPosts = async (req, res) => {
  console.log(req.query.cat);
  const q = req.query.cat
    ? "SELECT * FROM blogs WHERE cat=?"
    : "SELECT * FROM blogs";
  let result;
  try {
    const connection = await createConnection();
    if (req.query.cat) {
      [result] = await connection.execute(q, [req.query.cat]);
    } else {
      [result] = await connection.execute(q);
    }
    await connection.end();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};


const getPost = async (req, res) => {  
  const blogId = req.params.bid;
 
  const q = "SELECT * FROM blogs WHERE blog_id=?";
  try {
    const connection = await createConnection();
    const [result] = await connection.execute(q, [blogId]);
    await connection.end();

    if(result.length === 0){
       return res.status(400).json({
                message: "bad request",
                data:[],
              });
    }

    res.status(200).json({
      message: "request successful",
      data: [{ result: result[0], status: 200 }],
    });
   
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};



const addPost = async (req, res) => {
  const { title, content, image, ...others } = req.body;
  console.log(title, content, image, others);

  const token = await req.cookies.access_token;
  console.log(token);

  if (!token) return res.status(401).json("Not authentication");

  jwt.verify(token, "anmol", async (err, UserInfo) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" }); // Send an error response
    } else {
      const q = others.cat
        ? "INSERT INTO blogs(title, content, image, user_id, cat) VALUES (?, ?, ?, ?,? ) "
        : " INSERT INTO blogs (title, content, image, user_id) VALUES (?, ?, ?, ?)";

      const userId = UserInfo.id;
      try {
        const connection = await createConnection();
        const [result] = others.cat
          ? await connection.execute(q, [
              title,
              content,
              image,
              userId,
              others.cat,
            ])
          : await connection.execute(q, [title, content, image, userId]);
        await connection.end();
        res.status(201).json({ message: "blog created succesfully" });
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
};


const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  // console.log(token);

  if (!token) return res.status(401).json("Not authentication");

  jwt.verify(token, "anmol", async (err, UserInfo) => {
    if (err) {
      console.error(err);
      res.status(401).json({ message: "Invalid token" });
    } else {
      const postId = req.params.id;

      const q = "DELETE FROM blogs WHERE blog_id = ? AND user_id = ? ";
      try {
        const connection = await createConnection();
        const [result] = await connection.execute(q, [postId, 9]);
        await connection.end();
        // Send a success response if deletion is successful
        res.json({ message: "Post deleted successfully" });
      } catch (error) {
        console.error(error);
        // Handle database operation error and send an error response
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
};


const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content, image, cat } = req.body;

  let q = "UPDATE blogs SET title = ?, content = ?, image = ?";

  const values = [title, content, image];

  if (cat !== undefined) {
    q += ", cat = ?";
    values.push(cat);
  }

  q += " WHERE blog_id = ?";

  try {
    const connection = await createConnection();
    const [result] = await connection.execute(q, [...values, postId]);
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { getPosts, getPost, addPost, deletePost, updatePost };
