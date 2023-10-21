const createConnection = require("../../database");

const getPosts = async (req, res) => {
  // console.log(req.query.cat);
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
    res.status(200).json({
      message: "request successful",
      data: result,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};

const getPost = async (req, res) => {
  const blogId = req.params.id;
  console.log(blogId);

  const q = "SELECT * FROM blogs WHERE blog_id=?";
  try {
    const connection = await createConnection();
    const [result] = await connection.execute(q, [blogId]);
    await connection.end();

    if (result.length === 0) {
      return res.status(400).json({
        success: 0,
        data: [],
      });
    }

    res.status(200).json({
      success: 1,
      data: result[0],
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: 0,
      data: [],
    });
  }
};

module.exports = { getPosts, getPost };
