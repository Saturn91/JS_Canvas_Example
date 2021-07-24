function collide(obj1, obj2) {
    if (obj1.y + obj1.h < obj2.y
        || obj1.y > obj2.y + obj2.h
        || obj1.x + obj1.w < obj2.x
        || obj1.x > obj2.x + obj2.w) return false;
     return true;
}