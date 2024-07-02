#!/home/dokastho/code/pennington-photo/env/bin/python3

import pennington_photo
from pennington_photo.common.model import get_db
import sys


def insert_default_price():
    if len(sys.argv) != 3:
        exit(1)

    price = sys.argv[1]
    sizename_id = sys.argv[2]

    print(f"price: {price}")
    print(f"id: {sizename_id}")

    ok = input("ok? y|n ")
    if ok != 'y':
        exit(1)

    with pennington_photo.app.app_context():
        connection = get_db()
        cur = connection.execute(
            "INSERT INTO defaultSizePrices "
            "(price, sizenameId) "
            "VALUES (?, ?)",
            (price, sizename_id,)
        )
        cur.fetchone()
        pass
    return 0


def main():
    pass


if __name__ == "__main__":
    main()
    pass
