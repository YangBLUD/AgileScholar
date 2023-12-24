<template>
  <div class="container">
    <div class="avatar">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </div>
    <div class="username">
      我
    </div>
    <div>
      <div class="talktext talk-bubble btn-4">
        <p>{{ props.content }}</p>
      </div>
      <!--      <div class="tri-right btm-right"></div>-->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: String,
  avatar: String
})
function test() {
  console.log(props)
}
</script>

<style scoped>
.container {
  padding-left: 40px;
  margin: 1.5em;
  position: relative;
}

.talk-bubble {
  border-radius: 0 8px 8px 8px;
  position: relative;
  display: inline-block;
  max-width: 300px;
  margin-left: 15px;
  margin-top: 10px;
  height: auto;
  color: #ffffff;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
    7px 7px 20px 0px rgba(0, 0, 0, .1),
    4px 4px 5px 0px rgba(0, 0, 0, .1);
  outline: none;
  word-break: break-all;
}

.btn-4 {
  background-color: rgb(171, 211, 248);
  line-height: 42px;
  padding: 0;
  border: none;
}

.btn-4:hover {
  cursor: text;
}

.btn-4 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.btn-4:before,
.btn-4:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .9),
    -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, .9),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  transition: all 0.3s ease;
}

.btn-4:before {
  height: 0%;
  width: .1px;
}

.btn-4:after {
  width: 0%;
  height: .1px;
}

.btn-4:hover:before {
  height: 100%;
}

.btn-4:hover:after {
  width: 100%;
}

.btn-4 span:before,
.btn-4 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .9),
    -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, .9),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  transition: all 0.3s ease;
}

.btn-4 span:before {
  width: .1px;
  height: 0%;
}

.btn-4 span:after {
  width: 0%;
  height: .1px;
}

.btn-4 span:hover:before {
  height: 100%;
}

.btn-4 span:hover:after {
  width: 100%;
}

.tri-right.btm-right:after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: -10px;
  right: auto;
  top: 0;
  bottom: auto;
  border: 5px solid;
  border-color: #96e4df #96e4df transparent transparent;
}

.talktext {
  padding: 10px 20px 10px 20px;
  text-align: left;
  line-height: 1.5em;
}

.talktext p {
  /* remove webkit p margins */
  -webkit-margin-before: 0em;
  -webkit-margin-after: 0em;
}

.avatar {
  position: absolute;
  top: -2px;
  left: -8px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  color: rgb(144, 149, 157);
  margin-left: 15px;
  font-size: 14px;
}

/* .username {
  float: right;
  color: rgb(144, 149, 157);
  margin-right: 15px;
  font-size: 14px;
} */
</style>