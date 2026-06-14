import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class PublicDemoSafetyTests(unittest.TestCase):
    def test_demo_data_is_fully_marked_and_fictional(self):
        payload = json.loads((ROOT / "web" / "demo" / "race_cards.demo.json").read_text(encoding="utf-8"))
        self.assertIs(payload["is_demo"], True)
        self.assertTrue(payload["races"])
        self.assertTrue(all(race["is_demo"] is True for race in payload["races"]))
        self.assertTrue(all(race["race_id"].startswith("DEMO-") for race in payload["races"]))
        self.assertTrue(all(race["venue"] in {"灯明競馬場", "宝珠競馬場"} for race in payload["races"]))

    def test_required_public_roles_are_present(self):
        payload = json.loads((ROOT / "web" / "demo" / "race_cards.demo.json").read_text(encoding="utf-8"))
        roles = {entry["role"] for race in payload["races"] for entry in race["entries"]}
        self.assertTrue({"axis", "partner", "gekisou", "danger", "skip"}.issubset(roles))

    def test_brand_kit_has_eleven_fallback_assets(self):
        payload = json.loads((ROOT / "web" / "assets" / "brand-kit.json").read_text(encoding="utf-8"))
        self.assertIs(payload["is_demo"], True)
        self.assertEqual(len(payload["assets"]), 11)
        self.assertTrue(all(asset["fallback"] for asset in payload["assets"].values()))
        self.assertTrue(all(asset["file"] is None for asset in payload["assets"].values()))

    def test_forbidden_directories_do_not_exist(self):
        forbidden = ["in" + "coming", "data", "exports", "reports", "backups"]
        self.assertEqual([name for name in forbidden if (ROOT / name).exists()], [])

    def test_no_internal_public_labels_or_connection_markers(self):
        suffixes = {".md", ".html", ".css", ".js", ".json", ".py", ".gitignore"}
        markers = [
            "race" + "_code",
            "expected" + "_value",
            "local" + "host",
            "postgres" + "ql://",
            "mysql" + "://",
            "mongodb" + "://",
        ]
        matches = []
        for path in ROOT.rglob("*"):
            if not path.is_file() or path.suffix not in suffixes:
                continue
            text = path.read_text(encoding="utf-8").lower()
            for marker in markers:
                if marker.lower() in text:
                    matches.append(f"{path.relative_to(ROOT)}: {marker}")
        self.assertEqual(matches, [])

    def test_ui_contains_demo_notice_and_safe_fallback(self):
        html = (ROOT / "web" / "index.html").read_text(encoding="utf-8")
        script = (ROOT / "web" / "app.js").read_text(encoding="utf-8")
        self.assertIn("完全架空デモ", html)
        self.assertIn("うまなり地蔵", html)
        self.assertIn("安全な空表示", script)


if __name__ == "__main__":
    unittest.main()
